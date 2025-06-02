import { LightningElement, wire, api } from 'lwc';
import getAppealCampaign from '@salesforce/apex/CampaignHistoryController.getAppealCampaign';

export default class AppealHistory extends LightningElement {
    @api recordId;
    campaignData = [];
    error;

    columns = [
        {
            label: 'Campaign Name',
            fieldName: 'campaignUrl',
            type: 'url',
            typeAttributes: { label: { fieldName: 'campaignName' }, target: '_blank' }
        },
        { label: 'FSU Appeal Code', fieldName: 'fsuAppealCode' },
        { label: 'FSU Site', fieldName: 'fsuSite' },
        { label: 'Campaign Type', fieldName: 'type' },
        { label: 'AQB Start Date', fieldName: 'aqbStartDate', type: 'date' },
        { label: 'AQB End Date', fieldName: 'aqbEndDate', type: 'date' },
        { label: 'Status', fieldName: 'status' }
    ];

    @wire(getAppealCampaign, { recordId: '$recordId' })
    wiredCampaigns({ error, data }) {
        if (data) {
            this.campaignData = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.campaignData = [];
        }
    }

    get hasCampaigns() {
        return this.campaignData && this.campaignData.length > 0;
    }
}
