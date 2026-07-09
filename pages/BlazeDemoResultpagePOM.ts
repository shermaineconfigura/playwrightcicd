export default class BlazeDemoHomepagePOM {
    page: any;

    constructor(page: any) {
        this.page = page;
    }

    getFlightButton(btnIndex: number) {
        return this.page.locator(`//tbody/tr[${btnIndex}]/td/input`);
    }
}