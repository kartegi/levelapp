export interface FormDataValues {
  title: string;
  progress: string | number;
  goal: string | number;
  date: string;
}

export interface IOption {
  key: string;
  value: string;
}

export interface ISkillListItems {
  id: string;
  title: string;
  progress: number;
  goal: number;
  date: string;
  isarchive: 0 | 1;
}
