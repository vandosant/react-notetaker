var context = require.context('.', true, /.+\Spec\.jsx?$/);
context.keys().forEach(context);
export default context;