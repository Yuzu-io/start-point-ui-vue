type ParentIdType = number | string | any[] | null

/**
 * 递归构建树形结构
 *
 * @param items 数组类型的数据
 * @param parentId 当前节点的父节点ID，可选
 * @param parentIdField 父节点ID的字段名，默认为'parentId'
 * @param idField 当前节点的ID字段名，默认为'id'
 * @param childrenField 子节点的字段名，默认为'children'
 * @returns 返回树形结构数组
 */
export function recursiveTree<T>(
  items: T[],
  parentId?: ParentIdType,
  parentIdField = 'parentId',
  idField = 'id',
  childrenField = 'children'
) {
  const result: T[] = []
  for (const item of items) {
    if (
      (item as any)[parentIdField] === parentId ||
      (Array.isArray(parentId) && parentId.includes((item as any)[parentIdField] as never))
    ) {
      const children: T[] = recursiveTree<T>(
        items,
        (item as any)[idField],
        parentIdField,
        idField,
        childrenField
      )
      if (children.length) {
        ;(item as any)[childrenField] = children
      }
      result.push(item)
    }
  }
  return result
}
