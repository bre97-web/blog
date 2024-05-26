# Src

## Code Constraints

```typescript
export class EmptyService {
    /**
     * 全局可用 - 不可更改
     */
    public readonly static VariableName1;

    /**
     * 全局可用 - 允许更改
     */
    public static variableName2;

    /**
     * 实例化可用 - 不可更改
     */
    public readonly variableName3;

    /**
     * 实例化可用 - 允许更改
     */
    public variableName4;
}
// there is a line under this line

```

```typescript
/**
 * 不可更改的数据的集合的定义名称建议首字母大写且词尾表达复数意义
 */
export const enum Colors {
    Black = "black",
    Red = "red",
}

const Events = [
    "click",
    "scroll",
    "mouseover",
]

/**
 * 可更改的数据请使用小写字母开头
 */
export const colors = ["red", "green"]

const events = []
events.push("click")
```
