import { Get, JsonController } from "routing-controllers";
import { Inject, Service } from "typedi";
import { ReportsService } from "../services/reports.service";


@JsonController('/reports')
@Service()
export class ReportsController {
    @Inject() reportsService!: ReportsService;

    @Get('/restocking-needs')
    async restockingNeeds() {
        return this.reportsService.getProductsToRestock();
    }
}