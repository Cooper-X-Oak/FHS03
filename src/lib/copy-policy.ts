/** Exact contextual exceptions; keep additions reviewable. */
export const copyExceptions = [/\bpartner factor(?:y|ies)\b/gi,/\boriginal manufacturer(?:s)?\b/gi,/\bthird-party manufacturer(?:s)?\b/gi];
export function copyViolations(text:string):string[] {
  const scoped=copyExceptions.reduce((value,pattern)=>value.replace(pattern,''),text);
  const rules = [
    /\bmanufacturer(?:s)?\b|\bfactor(?:y|ies)\b/gi,
    /\bequipment maker(?:s)?\b/gi,/cuno/gi,
    /\b4\s+hours?\b|\b4-hour\b|\bwithin\s+4\b/gi,
    /100%\s+identical|\bsame as original\b/gi,
    /\bcheapest\b|\blowest price\b|\bworld[- ]class\b|\bmonopoly\b/gi,
    /\blorem\b|\bTODO\b|\bComing soon\b/gi,
  ];
  return [...new Set(rules.flatMap(rule=>scoped.match(rule)||[]))];
}
