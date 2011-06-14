if (window.DynamicForm == undefined) {
    (function($) {

        window.DynamicForm = function(options) {

            this.template = {};
            this.renderings = {};
            this.options = $.extend({
                    specification: {},
                    target: $('<div/>'),
                    choicesLength: 4
                }, options || {});

            this.addTemplate('form', '<form class="df-form" id="{id}"></form>');
            this.addTemplate('sections', '<div class="df-sec {name}"">');
            this.addTemplate('elements', '<div class="df-el {name}"></div>');
            this.addTemplate('group', '<fieldset class="df-group"><legend class="df-title">{name}</legend></fieldset>');
            this.addTemplate('title', '<div class="df-title">{title}</div>');

            this.addTemplate('radio', '<label for="{name}_{index}" class="df-lbl df-radio">{value}</label><input id="{name}_{index}" class="df-radio" type="radio" name="{name}" value="{value}"/>');
            this.addTemplate('checkbox', '<label for="{name}_{index}" class="df-lbl df-cb">{value}</label><input id="{name}_{index}" class="df-cb" type="checkbox" name="{name}" value="{value}"/>');
            this.addTemplate('open', '<label for="{name}" class="df-lbl df-open">{name}</label><input id="{name}" class="df-open" type="text" name="{name}"/>');
            this.addTemplate('select', '<label for="{name}" class="df-lbl df-sel">{name}</label><select id="{name}" class="df-sel" name="{name}"></select>');
            this.addTemplate('option', '<option class="df-opt" value="{value}">{value}</option>');

            this.addRendering('*', function (target, json, template) {
                if (template) {
                    var html = template.merge(json);
                    target.append(html);
                    return {
                        html: html
                    };
                }
            });
            this.addRendering('elements', function (section, element, template) {
                var html = template.merge(element);
                if (element.title !== undefined) {
                    this.renderBody(html, element, 'title');
                }
                this.renderBody(html, element, element.type);
                section.append(html);
                return {
                    html: html,
                    stop: true
                };

            });
            this.addRendering('closed', function (body, element) {
                this.renderBody(body, element,
                    element.choices.length > this.options.choicesLength ?
                        'select' :
                        (element.unique ? 'radio' : 'checkbox'));
            });
            this.addRendering('open', function (body, element, template) {
                if (element.choices) {
                    this.renderBody(body, element, 'closed');
                    body.append(template.merge({
                            name: element.name + '_other'
                        }));
                } else {
                    body.append(template.merge(element));
                }
                if (element.length) {
                    body.find(':input').attr('maxlength', element.length);
                }
            });
            this.addRendering(['checkbox', 'radio'], function (body, element, template) {
                for (var c in element.choices) {
                    body.append(template.merge({
                            name: element.name,
                            value: element.choices[c],
                            index: c
                        }));
                }
                for (var s in element.selected) {
                    body.find('[value="' + element.selected[s] + '"]').attr('checked', 'checked');
                }
            });
            this.addRendering('select', function (body, element, template) {
                body.append(template.merge(element));
                var select = body.find('select');
                if (!element.unique) {
                    select.attr('multiple', 'true');
                }
                for (var c in element.choices) {
                    select.append(this.template['option'].merge({
                            name: element.name,
                            value: element.choices[c],
                            index: c
                        }));
                }
                for (var s in element.selected) {
                    select.find('option[value="' + element.selected[s] + '"]').attr('selected', true);
                }
            });
        };

        DynamicForm.prototype = {

            id: function() {
                return this.options.specification.id;
            },

            toString: function() {
                return 'DynamicForm[' + id() + ']';
            },

            toObject: function() {
                var json = {};
                var els = this.options.target.find(':input:enabled:visible[name]');
                $.each(els.serializeArray(), function() {
                    if (json[this.name] !== undefined) {
                        if (!json[this.name].push) {
                            json[this.name] = [json[this.name]];
                        }
                        json[this.name].push(this.value || '');
                    } else {
                        json[this.name] = this.value || '';
                    }
                });
                // force array for multiple selects
                els.filter('select[multiple]').each(function() {
                    if (json[this.name] !== undefined && !json[this.name].push) {
                        json[this.name] = [json[this.name]];
                    }
                });
                // force array for multiple checkboxes with same name
                var counts = {};
                els.filter(':checkbox').each(function() {
                    counts[this.name] = (counts[this.name] || 0) + 1
                });
                for(var name in counts) {
                    if (counts[name] > 1 && json[name] !== undefined && !json[name].push) {
                        json[name] = [json[name]];
                    }
                }
                return json;
            },

            render: function() {
                var html = $('<div class="df-container"/>');
                this.renderBody(html, this.options.specification, 'form');
                // ensure no duplicate ids are created
                var ids = {};
                var self = this;
                var errs = [];
                html.find("*[id]").each(function() {
                    if (ids[this.id]) {
                        errs.push('Duplicate element ID ' + this.id + ' found in form specification ' + self.id());
                    } else {
                        ids[this.id] = true;
                    }
                });
                if (errs.length) {
                    throw new Error(errs);
                }
                this.options.target.append(html);
            },

            renderBody: function(target, json, type, nonRecursive) {
                if ($.isArray(json)) {
                    for (var i in json) {
                        this.renderBody(target, json[i], type);
                    }
                } else if (typeof json == 'object') {
                    var func = this.renderings[type] || this.renderings['*'];
                    //console.log('[renderBody]', arguments, func);
                    var instr = func.call(this, target, json, this.template[type]) || {};
                    if (!instr.stop) {
                        for (var containerId in json) {
                            this.renderBody(instr.html || target, json[containerId], containerId);
                        }
                    }
                }
            },

            addTemplate: function(name, template) {
                this.template[name] = {
                    merge: function(data) {
                        return $(template.replace(/\{([\w\.]*)\}/g, function (str, key) {
                            var keys = key.split("."), value = data[keys.shift()];
                            $.each(keys, function () {
                                value = value[this];
                            });
                            return (value === null || value === undefined) ? "" : value;
                        }));
                    }
                }
            },

            addRendering: function(name, func) {
                if ($.isArray(name)) {
                    for (var i in name) {
                        this.addRendering(name[i], func);
                    }
                } else {
                    this.renderings[name] = function() {
                        return func.apply(this, arguments);
                    };
                    this.renderings[name].toString = function() {
                        return 'Rendering[' + name + ']';
                    }
                }
            }
        }

    })(jQuery);
}