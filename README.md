# Example

```
const {action, buildError} = require('openwhisk-sequence-action')


module.exports.<name> = action((params, locals) => {
    const {name} = params
    if (!name) return buildError(400, 'Missing name parameter')
    
    return <result>
})
```
