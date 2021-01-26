import * as React from 'react';
import { IAgendaBuilderProps } from './IAgendaBuilderProps';
import App from './App';
// import styles from './AgendaBuilder.module.scss';
import './temp.css';


export default class AgendaBuilder extends React.Component<IAgendaBuilderProps, {}> {
  public render(): React.ReactElement<IAgendaBuilderProps> {
    return (
      // <div className={styles.appWrap}>
        <App
          context={this.props.context}
        />
      // </div>
    );
  }
}
