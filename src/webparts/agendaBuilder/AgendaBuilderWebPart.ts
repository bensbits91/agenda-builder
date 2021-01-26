import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AgendaBuilderWebPartStrings';
import AgendaBuilder from './components/AgendaBuilder';
import { IAgendaBuilderProps } from './components/IAgendaBuilderProps';

export interface IAgendaBuilderWebPartProps {
  context: any;
  description: string;
}

export default class AgendaBuilderWebPart extends BaseClientSideWebPart<IAgendaBuilderWebPartProps> {

  public render(): void {
    // console.clear();
    const element: React.ReactElement<IAgendaBuilderProps> = React.createElement(
      AgendaBuilder,
      {
        context: this.context,
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
