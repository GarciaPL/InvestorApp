export type InvestorId = {
    firm_id: number;
}

export interface Investor {
    firm_id: InvestorId;
    firm_name: string;
    firm_type: string;
    date_added: string;
    address: string; 
}

export type InvestorsInterface = Investor[]