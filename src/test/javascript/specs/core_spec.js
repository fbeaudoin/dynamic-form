JsHamcrest.Integration.screwunit();
JsMockito.Integration.screwunit();

Screw.Unit(function() {

    describe('Form instantiation', function() {

        it('Can create a new Form', function() {
            expect(new DynamicForm()).to_not(equal, undefined);
        });

        it('Can obtain Form id', function() {
            expect(new DynamicForm(sections).id()).to(equal, 'form_id');
        });

    });

    describe('Sections', function() {
        var dynForm = new DynamicForm(sections);

        it('Can obtain sections length', function() {
            expect(dynForm.sections().length).to(equal, 3);
        });

        it('Can obtain section informations', function() {
            expect(dynForm.sections()[2].title).to(equal, "section_3_title");
            expect(dynForm.sections()[2].description).to(equal, "section_3_description");
        });

        it('Can find section by name', function() {
            var section_2 = dynForm.section('section_2_name');

            expect(section_2.name).to(equal, "section_2_name");
            expect(section_2.title).to(equal, "section_2_title");
            expect(section_2.description).to(equal, "section_2_description");
        });
    });


    describe('Questions', function() {
        var dynForm = new DynamicForm(questions);

        it('Can obtain question length', function() {
            expect(dynForm.questions().length).to(equal, 5);
        });

        it('Can find question by name', function() {
            var question_4 = dynForm.question('question_4_name');

            expect(question_4.name).to(equal, "question_4_name");
            expect(question_4.label).to(equal, "question_4_label");

        });

    });

});
