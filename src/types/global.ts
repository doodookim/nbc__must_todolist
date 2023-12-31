import React, { ReactNode } from 'react'

export type Todo = {
    id: number | string;
    title: string;
    complete: boolean;
}

export type Modal = {
    onClose?: () => void;
}

export type Children = {
  children?: ReactNode
}