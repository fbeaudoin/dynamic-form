if (window.DynamicForm == undefined) {
    (function($) {

        window.DynamicForm = function(form, options) {
            var self = this;
            this.form = form;
            this.template = {};
            this.renderings = {};
            this.options = $.extend({
                    choicesLength: 4
                }, options || {});

            this.addTemplate('form', '<form class="df-form" id="{id}"></form>');
            this.addTemplate('sections', '<div class="df-sec" id="{name}">');
            this.addTemplate('questions', '<div class="df-qu" id="question_{name}"></div>');
            this.addTemplate('group', '<fieldset class="df-group" id="{name}"><legend>{label}</legend></fieldset>');
            this.addTemplate('label', '<p class="df-lbl">{label}</p>');

            this.addTemplate('radio', '<label class="df-radio">{value}</label><input class="df-radio" type="radio" name="{name}" value="{value}"/>');
            this.addTemplate('checkbox', '<label class="df-cb">{value}</label><input class="df-cb" type="checkbox" name="{name}" value="{value}"/>');
            this.addTemplate('open', '<label class="df-open">{name}</label><input class="df-open" type="text" name="{name}"/>');
            this.addTemplate('select', '<select class="df-sel" name="{name}"></select>');
            this.addTemplate('option', '<option class="df-opt" value="{value}">{value}</option>');

            this.addRendering('*', function (target, json, template) {
                if (template) {
                    var html = template.merge(json);
                    target.append(html);
                    return html;
                }
            });
            this.addRendering('questions', function (section, question, template) {
                var html = template.merge(question);
                if (question.type != 'group' && question.label && this.template['label']) {
                    html.append(this.template['label'].merge(question));
                }
                this.renderBody(html, question, question.type);
                section.append(html);

            });
            this.addRendering('closed', function (body, question) {
                this.renderBody(body, question,
                    question.choices.length > this.options.choicesLength ?
                        'select' :
                        (question.unique ? 'radio' : 'checkbox'));
            });
            this.addRendering('open', function (body, question, template) {
                if (question.choices) {
                    this.renderBody(body, question, 'closed');
                    body.append(template.merge({
                            name: question.name + '_other'
                        }));
                } else {
                    body.append(template.merge(question));
                }
                if (question.length) {
                    body.find(':input').attr('maxlength', question.length);
                }
            });
            this.addRendering(['checkbox', 'radio'], function (body, question, template) {
                for (var c in question.choices) {
                    body.append(template.merge({
                            name: question.name,
                            value: question.choices[c]
                        }));
                }
                for (var s in question.selected) {
                    body.find('[value="' + question.selected[s] + '"]').attr('checked', 'checked');
                }
            });
            this.addRendering('select', function (body, question, template) {
                body.append(template.merge(question));
                var select = body.find('select');
                if (!question.unique) {
                    select.attr('multiple', 'true');
                }
                for (var c in question.choices) {
                    select.append(this.template['option'].merge({
                            name: question.name,
                            value: question.choices[c]
                        }));
                }
                for (var s in question.selected) {
                    select.find('option[value="' + question.selected[s] + '"]').attr('selected', true);
                }
            });
        };

        DynamicForm.prototype = {

            id: function() {
                return this.form.id;
            },
            sections: function() {
                return this.form.sections;
            },
            section: function(name) {
                for (var section in this.form.sections) {
                    if (section.name == name)
                        return section;
                }
                return undefined;
            },
            questions: function() {
                var questions = [];
                for (var section in this.form.sections) {
                    for (var question in section.questions) {
                        questions.push(question);
                    }
                }
                return questions;
            },
            question: function(name) {
                for (var question in this.questions()) {
                    if (question.name == name)
                        return question;
                }
                return undefined;
            },
            render: function(target) {
                var dynaform = $('<div class="df-container"/>');
                var html = this.renderBody(dynaform, this.form, 'form');
                $('#' + target).append(dynaform);
            },
            renderBody: function(target, json, type) {
                if ($.isArray(json)) {
                    for (var i in json) {
                        this.renderBody(target, json[i], type);
                    }
                } else if (typeof json == 'object') {
                    var func = this.renderings[type] || this.renderings['*'];
                    var content = func.call(this, target, json, this.template[type]);
                    for (var containerId in json) {
                        this.renderBody(content || target, json[containerId], containerId);
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
                        this.renderings[name[i]] = func;
                    }
                } else {
                    this.renderings[name] = func;
                }
            }
        }

    })(jQuery);
}