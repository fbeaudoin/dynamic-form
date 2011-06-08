var questions = {
    "id": "mvc",
    "description": "",
    "sections": [
        {
            "name": "pregnancy",
            "questions": [
                {
                    "name": "pregnancy",
                    "label": "are_you_pregnant",
                    "type": "closed",
                    "unique": true,
                    "choices": ["yes","no"]
                },
                {
                    "name": "menopausal",
                    "label": "are_you_menopausal",
                    "type": "closed",
                    "unique": true,
                    "choices": ["no","less_than_ten_years","ten_and_more_years"]
                },
                {
                    "name": "contraceptive",
                    "label": "do_you_take_contraceptive",
                    "type": "closed",
                    "unique": true,
                    "choices": ["yes","no"]
                }
            ]
        },
        {
            "name": "heredity",
            "questions": [
                {
                    "name": "father_brother_55_or_less",
                    "label": "father_brother_55_or_less",
                    "type": "closed",
                    "unique": true,
                    "choices": ["yes","no","dont_know"]
                },
                {
                    "name": "father_brother_over_55",
                    "label": "father_brother_over_55",
                    "type": "closed",
                    "unique": true,
                    "choices": ["yes","no","dont_know"]
                },
                {
                    "name": "mother_sister_65_or_less",
                    "label": "mother_sister_65_or_less",
                    "type": "closed",
                    "unique": true,
                    "choices": ["yes","no","dont_know"]
                },
                {
                    "name": "mother_sister_over_65",
                    "label": "mother_sister_over_65",
                    "type": "closed",
                    "unique": true,
                    "choices": ["yes","no","dont_know"]
                },
                {
                    "name": "pharyngitis_infarct_palsy",
                    "label": "pharyngitis_infarct_palsy",
                    "type": "closed",
                    "unique": true,
                    "choices": ["yes","no"]
                }

            ]
        },

        {
            "name": "physical_activity",
            "questions": [
                {
                    "name": "nb_days_activity",
                    "label": "nb_days_activity",
                    "type": "closed",
                    "unique": true,
                    "choices": ["5days_and_more","3-4days_high","3-4days_moderate","1-2days","less_than_one"]
                }
            ]
        },

        {
            "name": "smoking",
            "questions": [
                {
                    "name": "smoke",
                    "label": "do_you_smoke",
                    "type": "closed",
                    "unique": true,
                    "choices": ["dont_smoke_but_exposed","dont_smoke","smoke_cigar_pipe","smoke_10_or_less","smoke_11_to_20","smoke_more_than_20"]
                }
            ]
        },

        {
            "name": "weight",
            "questions": [
                {
                    "name": "weight",
                    "label": "what_is_your_weight",
                    "type": "open"
                },
                {
                    "name": "height",
                    "label": "what_is_your_height",
                    "type": "open"
                }
            ]
        },

        {
            "name": "waist",
            "questions": [
                {
                    "name": "women_waist_circumference",
                    "label": "what_is_your_waist_circumference",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["less_than_88cm","88cm_or_more","dont_know"]
                },
                {
                    "name": "men_waist_circumference",
                    "label": "what_is_your_waist_circumference",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["less_than_102cm","102cm_and_more","dont_know"]
                }
            ]
        },

        {
            "name": "cholesterol",
            "questions": [
                {
                    "name": "total_cholesterol",
                    "label": "what_is_total_cholesterol",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["no_or_dont_know","yes_and_cholesterol_normal"]
                },
                {
                    "name": "hdl",
                    "label": "what_is_your_hdl",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["my_hdl","dont_know_hdl"]
                },
                {
                    "name": "blood_test_3years",
                    "label": "cholesterol_blood_test_since_3years",
                    "type": "closed",
                    "unique": true,
                    "choices": ["no_or_dont_know","yes_and_cholesterol_normal","yes_and_cholesterol_high", "yes_but_dont_remember"]
                },
            ]
        },
        {
            "name": "blood_pressure",
            "questions": [
                {
                    "name": "blood_pressure",
                    "label": "what_is_your_blood_pressure",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["mmHg", "dont_know_my_blood_pressure"]
                },
                {
                    "name": "blood_pressure_test_1year",
                    "label": "blood_pressure_test_since_1year",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["no","yes_blood_pressure_normal", "yes_blood_pressure_high", "yes_but_dont_remember"]
                }
            ]
        },
        {
            "name": "diabetes",
            "questions": [
                {
                    "name": "blood_sugar_level",
                    "label": "what_is_your_blood_sugar_level",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["mmolL", "dont_know_blood_sugar_level"]
                },
                {
                    "name": "starvation_8_hours",
                    "label": "starvation_8_hours",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["yes","no"]
                },
                {
                    "name": "took_blood_sugar_test",
                    "label": "did_you_make_blood_sugar_test",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["yes","no"]
                },
                {
                    "name": "what_was_blood_sugar_result",
                    "label": "what_was_blood_sugar_result",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["im_not_diabetes","my_blood_sugar_little_over_limit", "im_diabetes", "dont_remember_blood_sugar_result"]
                },
                {
                    "name": "diabetes_in_your_family",
                    "label": "diabetes_in_your_family",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["yes","no"]
                },

            ]
        },
        {
            "name": "drugs",
            "questions": [
                {
                    "name": "drug_for_blood_pressure",
                    "label": "drug_for_lower_blood_pressure",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["yes","no"]
                },
                {
                    "name": "drug_for_cholesterol",
                    "label": "drug_for_lower_cholesterol",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["yes","no"]
                },
                {
                    "name": "drug_for_fat",
                    "label": "drug_for_lower_fat_in_blood",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["yes","no"]
                },
                {
                    "name": "drug_for_diabetes",
                    "label": "drug_for_diabetes_control",
                    "type": "closed",
                    "unique" : true,
                    "choices": ["yes","no"]
                }
            ]
        }
    ]
}