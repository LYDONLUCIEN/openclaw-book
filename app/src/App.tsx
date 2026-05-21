import Layout from '@/components/Layout';

// 引导章
import Slide00_Cover from '@/slides/Slide00_Cover';
import Slide01_Cover from '@/slides/Slide01_Cover';
import Slide02_Chaos from '@/slides/Slide02_Chaos';
import Slide03_Ecosystem from '@/slides/Slide03_Ecosystem';

// 第一章：龙虾是什么
import Slide05_CoreTech from '@/slides/Slide05_CoreTech';
import Slide06_ThreeProblems from '@/slides/Slide06_ThreeProblems';
import Slide07_GreenGear from '@/slides/Slide07_GreenGear';
import Slide08_BlueGear from '@/slides/Slide08_BlueGear';
import Slide09_PurpleGear from '@/slides/Slide09_PurpleGear';
import Slide10_OrangeGear from '@/slides/Slide10_OrangeGear';
import Slide11_EvolutionLines from '@/slides/Slide11_EvolutionLines';
import Slide12_SkillsHarness from '@/slides/Slide12_SkillsHarness';
import Slide13_LobsterSummary from '@/slides/Slide13_LobsterSummary';

// 第二章：怎么用
import Slide14_DeployLevels from '@/slides/Slide14_DeployLevels';
import Slide15_FourProblems from '@/slides/Slide15_FourProblems';
import Slide16_CostStrategy from '@/slides/Slide16_CostStrategy';
import Slide17_Examples from '@/slides/Slide17_Examples';
import Slide18_PresentationItself from '@/slides/Slide18_PresentationItself';
import Slide19_PayToWin from '@/slides/Slide19_PayToWin';

// 第三章：未来
import Slide20_Future from '@/slides/Slide20_Future';
import Slide21_SelfCheck from '@/slides/Slide21_SelfCheck';
import Slide22_FinalWords from '@/slides/Slide22_FinalWords';
import Slide23_Thanks from '@/slides/Slide23_Thanks';

const TOTAL_SLIDES = 23;

const slides = [
  // 引导章
  Slide00_Cover,
  Slide01_Cover,
  Slide02_Chaos,
  Slide03_Ecosystem,
  // 第一章：龙虾是什么
  Slide05_CoreTech,
  Slide06_ThreeProblems,
  Slide07_GreenGear,
  Slide08_BlueGear,
  Slide09_PurpleGear,
  Slide10_OrangeGear,
  Slide11_EvolutionLines,
  Slide12_SkillsHarness,
  Slide13_LobsterSummary,
  // 第二章：怎么用
  Slide14_DeployLevels,
  Slide15_FourProblems,
  Slide16_CostStrategy,
  Slide17_Examples,
  Slide18_PresentationItself,
  Slide19_PayToWin,
  // 第三章：未来
  Slide20_Future,
  Slide21_SelfCheck,
  Slide22_FinalWords,
  Slide23_Thanks,
];

export default function App() {
  return <Layout totalSlides={TOTAL_SLIDES} slides={slides} />;
}
