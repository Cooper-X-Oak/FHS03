import type { PageContent } from '../types';
const content: PageContent = {
  description: 'Choose a PTFE filter cartridge for your liquid process. Compare wetting, seals and housing fit, then send your part number for a matched quote.',
  intro: 'A PTFE filter cartridge uses a polytetrafluoroethylene membrane to retain particles at the membrane surface. For solvent and chemical duties, compare the complete cartridge construction with your liquid, temperature and cleaning cycle before choosing a pore rating.',
  sections: [
    {heading:'Start with chemistry and wetting',paragraphs:['The membrane is only one wetted component. Support layers, core, end caps and seals also need to tolerate the liquid and cleaning chemicals at the operating temperature. A chemically suitable membrane does not establish the compatibility of the assembled cartridge.','Standard PTFE is hydrophobic. A liquid must wet the membrane for useful liquid flow; aqueous service may require a suitable wetting procedure or a hydrophilic grade. Confirm the actual membrane treatment and cleaning restrictions rather than assuming every PTFE cartridge behaves the same way.']},
    {heading:'Compare the rating, then the fit',paragraphs:['Match retention performance to the downstream requirement. Compare the stated test method and efficiency, not only the micron number. A finer rating can increase pressure drop and shorten service life if upstream solids are not controlled.','Measure the installed cartridge and identify both end connections. Confirm seal material, effective length, housing adapter and the permitted differential pressure at temperature. A similar silhouette is not evidence of interchangeability.']},
    {heading:'Prepare a useful quote request',paragraphs:['Send the full existing part number, liquid composition and concentration, operating temperature, required flow, housing model and quantity. Include the clean pressure drop and changeout point if you are trying to solve short filter life.','For a new duty, agree on a representative sample evaluation and the acceptance criteria before ordering production quantities.']}],
  specs: [
    {label:'Membrane and treatment',value:'[Confirm PTFE grades and wetting treatment]',note:'Confirm wetting for your liquid.'},
    {label:'Retention rating',value:'[Confirm PTFE micron range and efficiency]',note:'Request the retention test method.'},
    {label:'Length and end connection',value:'[Confirm PTFE lengths and end caps]',note:'Match the housing drawing.'},
    {label:'Seal and support materials',value:'[Confirm PTFE cartridge wetted materials]',note:'Check every wetted component.'},
    {label:'Operating limits',value:'[Confirm PTFE temperature and differential pressure limits]',note:'Pressure limits depend on temperature.'},
  ],
  faq: [
    {question:'What is the minimum order?',answer:'[Confirm PTFE minimum order quantity]'},
    {question:'Can I evaluate a sample?',answer:'[Confirm PTFE sample policy]'},
    {question:'What is the lead time?',answer:'[Confirm PTFE lead time]'},
    {question:'Can you match my existing cartridge?',answer:'Send the complete part number, housing details and process conditions. We compare materials, dimensions, seals and retention requirements before proposing an equivalent.'},
  ],
};
export default content;
