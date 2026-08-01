export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  source: string;
  impact: string;
  link: string;
  published_date: string;
  fetched_date?: string;
  is_published?: number;
}

export interface TaxRateItem {
  id: number;
  category: string;
  sub_category: string;
  rate: string;
  description: string;
  effective_from: string;
  effective_to?: string;
}

export interface ComplianceItem {
  id: number;
  month: string;
  day: number;
  event: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  financial_year?: string;
}

export interface FormItem {
  id: string;
  name: string;
  category: string;
  description: string;
  duePeriod?: string;
  dueDate?: string;
  link: string;
}

export interface AccountingStandard {
  code: string;
  title: string;
  summary: string;
  category: 'Ind AS' | 'AS';
  applicability: string;
}
