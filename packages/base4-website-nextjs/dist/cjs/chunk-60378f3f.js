'use strict';

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCanonicalPath"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"canonicalFields"}}}]}}],"directives":[]}]}}],"loc":{"start":0,"end":106}};
    doc.loc.source = {"body":"fragment ContentCanonicalPath on PlatformContent {\n  canonicalPath(input: { fields: $canonicalFields })\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

exports.frgmt1 = doc;
