export interface CRUD {
    list: (limit: number, page: number) => any,
    create: (resource: any) => any,
    updateById: (id: any, body: any) => any,
    readById: (id: any) => any,
    deleteById: (id: any) => any,
}