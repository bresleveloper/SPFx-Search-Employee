import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'BirthdayWebPartStrings';
import Birthday from './components/Birthday';
import { IBirthdayProps } from './components/IBirthdayProps';

export interface IBirthdayWebPartProps {
  before: string;
  after: string;
  minHeight: string;
}

export default class BirthdayWebPart extends BaseClientSideWebPart<IBirthdayWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBirthdayProps> = React.createElement(
      Birthday,
      {
        before: this.properties.before,
        after: this.properties.after,
        context: this.context,
        minHeight: this.properties.minHeight ? this.properties.minHeight : "614",
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
            description: "Settings"
          },
          groups: [
            {
              
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('before', {
                  label: "Days Before today"
                }),
                PropertyPaneTextField('after', {
                  label: "Days After today"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
