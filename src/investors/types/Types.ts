export interface InvestorId {
  firm_id: number
}

export interface Investor extends InvestorId {
  firm_name: string
  firm_type: string
  date_added: string
  address: string
}

export type InvestorsList = Investor[]

export interface InvestorDetailsProps {
  investors: InvestorsList
}

export interface Commitment {
  id: number
  asset_class: string
  firm_id: number
  currency: string
  amount: string
}

export type CommitmentList = Commitment[]

export interface CommitmentDetailsProps {
  commitments: CommitmentList
}

export interface PieChartLabel {
  id: number
  amount: number
  currency: string
}
