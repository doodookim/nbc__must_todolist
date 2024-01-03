import { ReactNode } from 'react';

export type Todo = {
  id: number | string;
  title: string;
  complete: boolean;
};

export type Modal = {
  onClose?: () => void;
};

export type Children = {
  children?: ReactNode;
};
export type Props = {
  filteredModal: { contents: string; createdAt: any; isCompleted: boolean };
};
