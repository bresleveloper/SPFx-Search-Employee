import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'BirthdayWebPartStrings';
import Birthday from './components/Birthday';
import { IBirthdayProps } from './components/IBirthdayProps';

export interface IBirthdayWebPartProps {
  before: string;
  after: string;
  minHeight: string;
  Dots: boolean;
  Speed: number;
  SlidesToShow: number;
  PauseOnHover: boolean;
  Autoplay: boolean;
  AutoplaySpeed: number;
}

export default class BirthdayWebPart extends BaseClientSideWebPart<IBirthdayWebPartProps> {
   HandlingEmptyEntry = (properti:boolean) =>{
      if ( properti === undefined ){ return true }
      else { return properti }
 }
  public render(): void {
    const element: React.ReactElement<IBirthdayProps> = React.createElement(
      Birthday,
      {
        before: this.properties.before ? this.properties.before : "7",
        after: this.properties.after ? this.properties.after : "7" ,
        context: this.context,
        minHeight: this.properties.minHeight ? this.properties.minHeight + "px" : "100%",
        Dots: this.HandlingEmptyEntry(this.properties.Dots),
        Speed: this.properties.Speed ? Number( this.properties.Speed ) : 500,
        SlidesToShow: this.properties.SlidesToShow ? Number( this.properties.SlidesToShow ) : 1,
        PauseOnHover : this.HandlingEmptyEntry(this.properties.PauseOnHover),
        Autoplay : this.HandlingEmptyEntry(this.properties.Autoplay),
        AutoplaySpeed : this.properties.AutoplaySpeed ? Number( this.properties.AutoplaySpeed ): 3000,
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
                  label: "Days Before today",
                  value: "7"
                }),
                PropertyPaneTextField('after', {
                  label: "Days After today",
                  value: "7"
                }),
                PropertyPaneTextField('minHeight', {
                  label: "min Height (Expecting numbers)"
                }),
                PropertyPaneCheckbox('Dots',{
                  text: 'View dots' ,
                  checked: true
                }),
                PropertyPaneTextField('Speed', {
                  label: "Animation speed in milliseconds (Expecting numbers)",
                  value: "500"
                }),
                PropertyPaneTextField('SlidesToShow', {
                  label: "How many slides to show in one frame (Expecting numbers)",
                  value:"1"
                }),
                PropertyPaneCheckbox('PauseOnHover',{
                  text: 'Prevents autoplay while hovering on track' ,
                  checked: true
                }),
                PropertyPaneCheckbox('Autoplay',{
                  text: 'auto play',
                  checked: true 
                }),
                PropertyPaneTextField('AutoplaySpeed', {
                  label: "Delay between each auto scroll (in milliseconds - Expecting numbers)",
                  value:"3000"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
