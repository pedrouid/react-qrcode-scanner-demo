import * as React from "react";
import styled from "styled-components";
import QRCodeScanner from "./components/QRCodeScanner";
import { colors } from "./styles";

const SApp = styled.div`
  text-align: center;
`;

const SAppHeader = styled.header`
  background-color: rgb(${colors.grey});
  padding: 10px;
  color: rgb(${colors.white});
`;

const SAppTitle = styled.h1`
  margin: 20px auto;
`;

const SAppContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends React.Component {
  public render() {
    return (
      <SApp>
        <SAppHeader>
          <SAppTitle>React QRCode Scanner</SAppTitle>
        </SAppHeader>
        <SAppContent>
          <QRCodeScanner />
        </SAppContent>
      </SApp>
    );
  }
}

export default App;
