var survey_1 = {
    "id": "survey_1",
    "description": "employee_feedback",
    "sections":
        [
            {
                "name": "main_section",
                "questions": [
                    {
                        "name": "gender",
                        "label": "specify_gender",
                        "type": "closed",
                        "unique": true,
                        "choices": ["male","female"],
                        "selected": ["female"]

                    },
                    {
                        "name": "department",
                        "label": "working_department",
                        "type": "closed",
                        "unique": false,
                        "choices": ["administration", "finance", "marketing", "sales"],
                        "selected": ["sales", "finance"]

                    },
                    /*{
                        "name": "groupe_one",
                        "type": "group",
                        "label": "age_and_city",
                        "questions":
                            [
                                {
                                    "name": "age",
                                    "type": "open",
                                    "length": 3
                                },
                                {
                                    "name": "city",
                                    "label": "city",
                                    "type": "closed",
                                    "unique": true,
                                    "choices": ["quebec", "montreal", "laval", "levis", "brossard"],
                                    "selected": ["laval"]
                                }
                            ]
                    },*/
                    {
                        "name": "age",
                        "type": "open",
                        "length": 3
                    },
                    {
                        "name": "city",
                        "label": "city",
                        "type": "closed",
                        "unique": true,
                        "choices": ["quebec", "montreal", "laval", "levis", "brossard"],
                        "selected": ["laval"]
                    },
                    {
                        "name": "country",
                        "label": "country",
                        "type": "closed",
                        "unique": false,
                        "choices": ["usa", "canada", "spain", "germany", "mexico", "italy"],
                        "selected": ["spain", "italy"]
                    },
                    {
                        "name": "cookie",
                        "label": "cookie",
                        "type": "open",
                        "unique": false,
                        "length": 25,
                        "choices": ["almond", "caramel", "chocolat"]
                    },
                    {
                        "name": "car",
                        "label": "car",
                        "type": "open",
                        "unique": true,
                        "length": 25,
                        "choices": ["honda", "nissan", "ford", "audi"]
                    }
                    ,
                    {
                        "name": "are_you_ok",
                        "label": "are_you_ok",
                        "type": "closed",
                        "unique": false,
                        "choices": ["Yes", "No"]
                    }
                ]
            },
            {
                "name": "other_section"
            }
        ]
};
