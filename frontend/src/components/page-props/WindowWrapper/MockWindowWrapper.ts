import { WindowWrapperInterface } from "./index";
export class MockWindowWrapper implements WindowWrapperInterface {

  calledToTop = false;
  toTop(): Window | null {
    this.calledToTop = true;
    return null;
  }

  calledToTopNewTab = false;
  toTopNewTab() {
    this.calledToTopNewTab = true;
    return null;
  }

}


