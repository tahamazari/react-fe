export const API_URL = "http://localhost:5000"

export const BASE_TABLES = [
    { 
        label: 'Events',
        value: 'events_info',
    },
    { 
        label: 'Companies',
        value: 'company_info',
    },
    { 
        label: 'Employees',
        value: 'employee_info',
    }
]

export const BASE_TABLE_COLUMNS = {
    "events_info": [
        { label: "Event URL", value: "event_url" },
        { label: "Event Name", value: "event_name" },
        { label: "Event Start Date", value: "event_start_date" },
        { label: "Event City", value: "event_city" },
        { label: "Event Country", value: "event_country" },
        { label: "Event Industry", value: "event_industry" }
    ],
    "company_info": [
        { label: "Company URL", value: "company_url" },
        { label: "Company Name", value: "company_name" },
        { label: "Company Industry", value: "company_industry" },
        { label: "Company Revenue", value: "company_revenue" },
        { label: "Company Country", value: "company_country" }
    ],
    "employee_info": [
        { label: "Company URL", value: "company_url" },
        { label: "Person ID", value: "person_id" },
        { label: "Person First Name", value: "person_first_name" },
        { label: "Person Last Name", value: "person_last_name" },
        { label: "Person Email", value: "person_email" },
        { label: "Person City", value: "person_city" },
        { label: "Person Country", value: "person_country" },
        { label: "Person Seniority", value: "person_seniority" },
        { label: "Person Department", value: "person_department" }
    ]
};