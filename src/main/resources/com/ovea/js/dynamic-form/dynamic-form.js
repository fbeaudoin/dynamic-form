if (window.DynamicForm == undefined) {
    (function($) {


        window.DynamicForm = function(form, options) {

            self = this;
            this.form = form;
            this.options = $.extend({
                choicesLength: 4
            }, options || {});

            this.template = {};

            this.addTemplate('form', '<form id={id}></form>');
            this.addTemplate('section', '<div id="{name}">');
            this.addTemplate('question', '<div id="question_{name}"></div>');
            this.addTemplate('question_label', '<p>{label}</p>');
            this.addTemplate('radio', '<label>{value}<input type="radio" name="{name}" value="{value}"/></label>');
            this.addTemplate('checkbox', '<label>{value}<input type="checkbox" name="{name}" value="{value}"/></label>');
            this.addTemplate('text', '<label>{name}<input type="text" name="{name}"/></label>');
            this.addTemplate('select', '<select name="{name}"></select>');
            this.addTemplate('option', '<option value="{value}">{value}</option>');
        };

        function renderFieldsFor(element, question) {
            var view = {};
            view.name = question.name;

            // Render closed
            if (question.type == 'closed') {
                if (question.choices.length > self.options.choicesLength) {
                    renderSelect(element, question);
                } else {
                    if (question.unique) {
                        renderRadio(element, question);
                    } else {
                        renderCheckbox(element, question);
                    }
                }
                return;
            }

            if (question.type == 'open') {

                if (question.choices) {
                    view.name = 'other';
                    if (question.choices.length > self.options.choicesLength) {
                        renderSelect(element, question);
                    } else {
                        if (question.unique) {
                            renderRadio(element, question);
                        } else {
                            renderCheckbox(element, question);
                        }
                    }

                }

                element.append(self.template['text'].merge(view));
                if (question.length) {
                    element.find(':input').attr('maxlength', question.length);
                }
            }
        }

        function renderRadio(element, question) {
            var view = {};
            view.name = question.name;
            for each (var choice in question.choices) {
                view.value = choice;
                element.append(self.template['radio'].merge(view));
            }

            for each(var selected in question.selected) {
                element.find('[value="' + selected + '"]').attr('checked', 'checked');
            }
        }

        function renderCheckbox(element, question) {
            var view = {};
            view.name = question.name;
            for each (var choice in question.choices) {
                view.value = choice;
                element.append(self.template['checkbox'].merge(view));
            }

            for each(var selected in question.selected) {
                element.find('[value="' + selected + '"]').attr('checked', 'checked');
            }
        }

        function renderSelect(element, question) {
            var view = {};
            view.name = question.name;

            element.append(self.template['select'].merge(question));
            if (!question.unique)
                element.find('select').attr('multiple', 'true');

            var select = element.find('select');
            for each (var choice in question.choices) {
                view.value = choice;
                select.append(self.template['option'].merge(view));
            }

            for each(var selected in question.selected) {
                select.find('option[value="' + selected + '"]').attr('selected', true);
            }
        }


        DynamicForm.prototype = {

            id: function() {
                return this.form.id;
            },
            sections: function() {
                return this.form.sections;
            },
            section: function(name) {
                for each (var section in this.form.sections) {
                    if (section.name == name)
                        return section;
                }
                return undefined;
            },
            questions: function() {
                var questions = [];
                for each (var section in this.form.sections) {
                    for each (var question in section.questions) {
                        questions.push(question);
                    }
                }
                return questions;
            },
            question: function(name) {
                for each (var question in this.questions()) {
                    if (question.name == name)
                        return question;
                }
                return undefined;
            },
            render: function(target) {
                var form = $('#' + target).append(this.template['form'].merge(this.form));
                form.hide();

                for each (var section in this.form.sections) {
                    $('form', form).append(this.template['section'].merge(section));

                    for each(var question in section.questions) {
                        $('form', form).find('#' + section.name).append(this.template['question'].merge(question));
                        var element = $('form', form).find('#question_' + question.name);
                        if (question.label) {
                            element.append(this.template['question_label'].merge(question));
                        }

                        renderFieldsFor(element, question);
                    }
                }

                form.show();
            },

            addTemplate: function(name, template) {
                this.template[name] = {
                    merge: function(data) {
                        return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
                            var keys = key.split("."), value = data[keys.shift()];
                            $.each(keys, function () {
                                value = value[this];
                            });
                            return (value === null || value === undefined) ? "" : value;
                        });
                    }
                }
            }

        }

    })(jQuery);
}