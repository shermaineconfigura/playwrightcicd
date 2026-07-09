export default class HomepagePOM {
    page: any;

    constructor(page: any) {
        this.page = page;
    }

    get getFromCityListbox(){
        return this.page.locator('select[name="fromPort"]');
    }

    get getToCityListbox(){
        return this.page.locator('select[name="toPort"]');
    }  

    get getFindFlightsButton(){
        return this.page.getByRole('button', { name: 'Find Flights' });
    }
}