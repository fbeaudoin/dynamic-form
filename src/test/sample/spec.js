var spec = {
    "id": "survey_1",
    "description": "employee_feedback",
    "sections":
        [
            {
                "name": "main_section",
                "elements": [
                    {
                        "name": "gender",
                        "title": "specify_gender : ",
                        "type": "closed",
                        "unique": true,
                        "choices": ["male","female"],
                        "selected": ["female"]

                    },
                    {
                        "name": "department",
                        "title": "working_department : ",
                        "type": "closed",
                        "unique": false,
                        "choices": ["administration", "finance", "marketing", "sales"],
                        "selected": ["sales", "finance"]

                    },
                    {
                        "name": "groupe_one",
                        "type": "group",
                        "elements":
                            [
                                {
                                    "name": "age",
                                    "type": "open",
                                    "length": 3
                                },
                                {
                                    "name": "city",
                                    "type": "closed",
                                    "unique": true,
                                    "choices": ["quebec", "montreal", "laval", "levis", "brossard"],
                                    "selected": ["laval"]
                                }
                            ]
                    },
                    {
                        "name": "country",
                        "title": "",
                        "type": "closed",
                        "unique": false,
                        "choices": ["usa", "canada", "spain", "germany", "mexico", "italy"],
                        "selected": ["spain", "italy"]
                    },
                    {
                        "name": "cookie",
                        "title": "your cookie : ",
                        "type": "open",
                        "unique": false,
                        "length": 25,
                        "choices": ["almond", "caramel", "chocolat"]
                    },
                    {
                        "name": "car",
                        "title": "your car : ",
                        "type": "open",
                        "unique": true,
                        "length": 25,
                        "choices": ["honda", "nissan", "ford", "audi"]
                    }
                    ,
                    {
                        "name": "are_you_ok",
                        "title": "are_you_ok : ",
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
