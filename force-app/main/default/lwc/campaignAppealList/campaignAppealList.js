import { LightningElement, wire, api } from 'lwc';
import getCampaignsForContact from '@salesforce/apex/CampaignMemberController.getCampaignsForContact'; 

export default class CampaignMemberList extends LightningElement {
    @api recordId;  // This will be the Contact ID passed from the page layout
    campaignData = [];  // Store the list of Campaign data
    error;            // Store any error message

    // Define the columns for the lightning-datatable
    columns = [
        { label: 'Campaign Name', fieldName: 'campaignName' },
        { label: 'FSU Appeal Code', fieldName: 'fsuAppealCode' },
        { label: 'FSU Site', fieldName: 'fsuSite' },
        { label: 'Campaign Type', fieldName: 'type' },
        { label: 'AQB Start Date', fieldName: 'aqbStartDate', type: 'date' },
        { label: 'Status', fieldName: 'status' }
    ];

    // Fetch the campaign data using the Apex method
    @wire(getCampaignsForContact, { contactId: '$recordId' })
    wiredCampaigns({ error, data }) {
        if (data) {
            this.campaignData = data;
        } else if (error) {
            this.error = error;
            console.error('Error fetching campaigns:', error);
        }
    }
}
