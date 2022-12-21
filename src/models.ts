export type InternResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Intern[];
};

export type AddInternResponse = {
  id: string;
  createdAt: string;
};

export type EditInternResponse = {
  updatedAt: string;
};

export type Intern = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
};
