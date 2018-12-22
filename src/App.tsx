import * as React from "react";
import styled from "styled-components";
import Button from "./components/Button";
import QRCodeScanner from "./components/QRCodeScanner";
import { colors } from "./styles";

const SContainer = styled.div`
  text-align: center;
`;

const SHeader = styled.header`
  background-color: rgb(${colors.grey});
  padding: 10px;
  color: rgb(${colors.white});
`;

const SHero = styled.h1`
  margin: 20px auto;
`;

const STitle = styled.h5`
  font-weight: bold;
  margin: 30px auto;
`;

const SContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SFlex = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SMonospace = styled.div`
  width: 100%;
  font-family: monospace;
  margin: 30px auto;
  padding: 30px 60px;
  word-break: break-word;

  border: 1px solid rgba(${colors.dark}, 0.3);
  border-radius: 6px;
`;

interface IAppState {
  scan: boolean;
  result: any | null;
}

class App extends React.Component {
  public state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      scan: false,
      result: null
    };
  }

  public resetApp = () => this.setState({ scan: false, result: null });

  public startScan = () => this.setState({ scan: true });

  public onValidate = (result: any) => {
    if (result && typeof result === "string") {
      return true;
    }
    return false;
  };

  public onScan = (result: any) => {
    if (result) {
      this.setState({ scanner: false, result });
    }
  };

  public onClose = () => this.setState({ scanner: false });

  public render() {
    return (
      <SContainer>
        <SHeader>
          <SHero>React QRCode Scanner</SHero>
        </SHeader>
        <SContent>
          {!this.state.result ? (
            !this.state.scan ? (
              <SFlex>
                <STitle>{"Press scan to toggle QR Code scanner"}</STitle>
                <Button onClick={this.startScan}>{"Scan"}</Button>
              </SFlex>
            ) : (
              <QRCodeScanner
                onScan={this.onScan}
                onValidate={this.onValidate}
                onClose={this.onClose}
              />
            )
          ) : (
            <SFlex>
              <SMonospace>{this.state.result}</SMonospace>
              <Button onClick={this.resetApp}>{"Reset"}</Button>
            </SFlex>
          )}
        </SContent>
      </SContainer>
    );
  }
}

export default App;
