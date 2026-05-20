import Layout from '@/components/Layout';
import Slide00_Cover from '@/slides/Slide00_Cover';
import Slide01_Cover from '@/slides/Slide01_Cover';
import Slide02_Chaos from '@/slides/Slide02_Chaos';
import Slide03_Ecosystem from '@/slides/Slide03_Ecosystem';
import Slide04_ThreeProblems from '@/slides/Slide04_ThreeProblems';
import Slide05_MemoryProblem from '@/slides/Slide05_MemoryProblem';
import Slide07_ActionProblem from '@/slides/Slide07_ActionProblem';
import Slide08_ReAct from '@/slides/Slide08_ReAct';
import Slide09_OpenClawArch from '@/slides/Slide09_OpenClawArch';
import Slide10_OpenClawSkills from '@/slides/Slide10_OpenClawSkills';
import Slide11_OpenClawMemory from '@/slides/Slide11_OpenClawMemory';
import Slide12_Comparison from '@/slides/Slide12_Comparison';
import Slide13_Limitations from '@/slides/Slide13_Limitations';
import Slide14_Scene1 from '@/slides/Slide14_Scene1';
import Slide15_Scene2 from '@/slides/Slide15_Scene2';
import Slide16_Scene3 from '@/slides/Slide16_Scene3';
import Slide17_Scene4 from '@/slides/Slide17_Scene4';
import Slide18_Status from '@/slides/Slide18_Status';
import Slide19_Summary from '@/slides/Slide19_Summary';
import Slide20_Summary from '@/slides/Slide20_Summary';
import Slide21_Thanks from '@/slides/Slide21_Thanks';

const TOTAL_SLIDES = 21;

const slides = [
  Slide00_Cover,
  Slide01_Cover,
  Slide02_Chaos,
  Slide03_Ecosystem,
  Slide04_ThreeProblems,
  Slide05_MemoryProblem,
  Slide07_ActionProblem,
  Slide08_ReAct,
  Slide09_OpenClawArch,
  Slide10_OpenClawSkills,
  Slide11_OpenClawMemory,
  Slide12_Comparison,
  Slide13_Limitations,
  Slide14_Scene1,
  Slide15_Scene2,
  Slide16_Scene3,
  Slide17_Scene4,
  Slide18_Status,
  Slide19_Summary,
  Slide20_Summary,
  Slide21_Thanks,
];

export default function App() {
  return <Layout totalSlides={TOTAL_SLIDES} slides={slides} />;
}
