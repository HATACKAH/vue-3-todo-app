export type TodoItem = {
    id: number,
    text: string,
    completed: boolean;
}

export type State = {
    loading: boolean,
    items: TodoItem[],
    editableItems: TodoItem[],
    filterQuery: string
}

export const state: State = {
    loading: false,
    items: [],
    editableItems: [],
    filterQuery: 'all'
}