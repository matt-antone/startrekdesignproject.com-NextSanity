"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var icons = require("@sanity/icons"), sanity = require("sanity");
const getSingletonDocuments = (schema) => {
  var _a;
  return (_a = schema._original) == null ? void 0 : _a.types.filter(({ options }) => options == null ? void 0 : options.singleton).map((s) => s.name);
}, getIsSingleton = (schema, schemaType) => {
  var _a, _b, _c, _d;
  const documentSchema = (_b = (_a = schema._original) == null ? void 0 : _a.types) == null ? void 0 : _b.find(
    ({ name }) => name == schemaType
  );
  return (_d = (_c = documentSchema == null ? void 0 : documentSchema.options) == null ? void 0 : _c.singleton) != null ? _d : !1;
}, singletonDocumentListItem = (config) => {
  var _a, _b;
  if (!(config != null && config.S) || !(config != null && config.type) || !config.context)
    throw new Error(`
      S, context, and type must be provided to your singletonDocumentListItem
      Ex: singletonDocumentListItem({ S, context, type: 'product'})
    `);
  const { S, type, title, icon, id, context } = config, { schema } = context, listTitle = (_b = title != null ? title : (_a = schema.get(type)) == null ? void 0 : _a.title) != null ? _b : type, listIcon = icon != null ? icon : icons.DocumentIcon, listId = id != null ? id : type;
  return S.listItem().title(listTitle).icon(listIcon).child(S.document().schemaType(type).title(listTitle).id(listId));
}, singletonDocumentListItems = (config) => {
  if (!config.S || !config.context)
    throw new Error(`
      S and context must be provided
      Ex: singletonDocumentListItems({ S, context })
    `);
  const { S, context } = config, { schema } = context, singletons = getSingletonDocuments(schema);
  return singletons == null ? void 0 : singletons.map(
    (schemaType) => singletonDocumentListItem({ S, context, type: schemaType })
  );
}, filteredDocumentListItems = (config) => {
  if (!config.S || !config.context)
    throw new Error(`
      S and context must be provided
      Ex: filteredDocumentListItems({ S, context })
    `);
  const { S, context } = config, { schema } = context, singletons = getSingletonDocuments(schema);
  return S.documentTypeListItems().filter(
    (type) => singletons && !singletons.includes(type.getId())
  );
}, newDocumentOptions = (prev, { schema, creationContext: { type, schemaType } }) => {
  const singletons = getSingletonDocuments(schema), filterSingletons = ({ templateId }) => !(singletons != null && singletons.includes(templateId));
  return type == "global" || singletons != null && singletons.includes(schemaType != null ? schemaType : "") ? prev.filter(filterSingletons) : prev;
}, actions = (prev, { schema, schemaType }) => getIsSingleton(schema, schemaType) ? prev.filter(
  ({ action }) => ["publish", "unpublish", "discardChanges", "restore"].includes(
    action
  )
) : prev, singletonTools = sanity.definePlugin((options) => ({
  name: "singleton-tools",
  document: {
    newDocumentOptions,
    actions
  }
}));
exports.filteredDocumentListItems = filteredDocumentListItems;
exports.singletonDocumentListItem = singletonDocumentListItem;
exports.singletonDocumentListItems = singletonDocumentListItems;
exports.singletonTools = singletonTools;
//# sourceMappingURL=index.js.map
