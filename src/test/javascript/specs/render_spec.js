JsHamcrest.Integration.screwunit();
JsMockito.Integration.screwunit();

Screw.Unit(function() {

    describe('Form rendering', function() {

        it('Form element is rendered', function() {
            expect($('#survey_1')). to_not(equal, undefined);
        });

        it('Form element have the expected id', function() {
            expect($('#survey_1').attr('id')).to(equal, 'survey_1');
        });

        it('Sections are rendered', function() {
            expect($('#survey_1 > div').length).to(equal, 2);
        });

        it('Sections have the expected  ids', function() {
            expect($($('#survey_1 > div')[0]).attr('id')).to(equal, 'main_section');
            expect($($('#survey_1 > div')[1]).attr('id')).to(equal, 'other_section');
        });

        it('Question with label is rendered with a label', function() {
            var questions = $('#survey_1 > div');
            expect(questions.length).to(equal, 2);

            expect($($(questions[0]).find('p')[0]).text()).to(equal, 'specify_gender');
            expect($($(questions[0]).find('p')[0]).text()).to(equal, 'specify_gender');
        });

        it('Question without label is rendered without a label', function() {
                expect($($('#question_age').find('p')).length).to(equal, 0);
        });

        // Test Closed questions
        it('Closed question with unique choice is rendered by radio', function() {
            expect($($('#question_gender').find('input')[0]).attr('type')).to(equal, 'radio');
            expect($($('#question_gender').find('input')[0]).attr('name')).to(equal, 'gender');
            expect($($('#question_gender').find('input')[0]).attr('value')).to(equal, 'male');
            expect($($('#question_gender').find('label')[0]).text()).to(equal, 'male');
        });

        it('Closed question with multiple choices is rendered by checkbox', function() {
            expect($($('#question_department').find('input')[0]).attr('type')).to(equal, 'checkbox');
            expect($($('#question_department').find('input')[0]).attr('name')).to(equal, 'department');
            expect($($('#question_department').find('input')[0]).attr('value')).to(equal, 'administration');
            expect($($('#question_department').find('label')[0]).text()).to(equal, 'administration');

            expect($($('#question_department').find('input')[1]).attr('type')).to(equal, 'checkbox');
            expect($($('#question_department').find('input')[1]).attr('name')).to(equal, 'department');
            expect($($('#question_department').find('input')[1]).attr('value')).to(equal, 'finance');
            expect($($('#question_department').find('label')[1]).text()).to(equal, 'finance');

            expect($($('#question_department').find('input')[2]).attr('type')).to(equal, 'checkbox');
            expect($($('#question_department').find('input')[2]).attr('name')).to(equal, 'department');
            expect($($('#question_department').find('input')[2]).attr('value')).to(equal, 'marketing');
            expect($($('#question_department').find('label')[2]).text()).to(equal, 'marketing');

            expect($($('#question_department').find('input')[3]).attr('type')).to(equal, 'checkbox');
            expect($($('#question_department').find('input')[3]).attr('name')).to(equal, 'department');
            expect($($('#question_department').find('input')[3]).attr('value')).to(equal, 'sales');
            expect($($('#question_department').find('label')[3]).text()).to(equal, 'sales');

        });

        it('Closed question with unique choice is rendered by select when there is too many choices (modifiable parameter)', function() {
            var dropDown = $($('#question_city').find('select')[0]);
            expect(dropDown.find('option').length).to(equal, 5);
        });

        it('Closed question with multiple choices is rendered by multiple select when there is too many choices (modifiable parameter)', function() {
            var dropDown = $($('#question_country').find('select')[0]);
            expect(dropDown.attr('multiple')).to(equal, true);
            expect(dropDown.find('option').length).to(equal, 6);
        });

        // Test Open questions
        it('Open question is rendered by textfield', function() {
            expect($($('#question_age').find('input')[0]).attr('type')).to(equal, 'text');
            expect($($('#question_age').find('input')[0]).attr('name')).to(equal, 'age');
        });


        it('Open question can have max length', function() {
            expect($($('#question_age').find('input')[0]).attr('maxlength')).to(equal, 3);
        });

        it('Open question with unique propositions is rendered by radios and a textfield', function() {
            expect($($('#question_car').find('input')[0]).attr('type')).to(equal, 'radio');
            expect($($('#question_car').find('input')[0]).attr('name')).to(equal, 'car');
            expect($($('#question_car').find('input')[0]).attr('value')).to(equal, 'honda');
            expect($($('#question_car').find('label')[0]).text()).to(equal, 'honda');

            expect($($('#question_car').find('input')[1]).attr('type')).to(equal, 'radio');
            expect($($('#question_car').find('input')[1]).attr('name')).to(equal, 'car');
            expect($($('#question_car').find('input')[1]).attr('value')).to(equal, 'nissan');
            expect($($('#question_car').find('label')[1]).text()).to(equal, 'nissan');

            expect($($('#question_car').find('input')[2]).attr('type')).to(equal, 'radio');
            expect($($('#question_car').find('input')[2]).attr('name')).to(equal, 'car');
            expect($($('#question_car').find('input')[2]).attr('value')).to(equal, 'ford');
            expect($($('#question_car').find('label')[2]).text()).to(equal, 'ford');

            expect($($('#question_car').find('input')[3]).attr('type')).to(equal, 'radio');
            expect($($('#question_car').find('input')[3]).attr('name')).to(equal, 'car');
            expect($($('#question_car').find('input')[3]).attr('value')).to(equal, 'audi');
            expect($($('#question_car').find('label')[3]).text()).to(equal, 'audi');

        });

        it('Open question with multiples propositions is rendered by checkbox and a textfield', function() {


        });



//
//        it('Open question with too multiples propositions is rendered by a select and a textfield', function() {
//        });




        // Test default value
        it('Support default value', function() {
            expect($('#question_city').find('option:selected').attr('value')).to(equal, 'laval');

            expect($('#question_department').find('input[value="finance"]').attr('checked')).to(equal, true);
            expect($('#question_department').find('input[value="sales"]').attr('checked')).to(equal, true);

            expect($('#question_gender').find('[value="female"]').attr('checked')).to(equal, true);
        });


















    });
});
