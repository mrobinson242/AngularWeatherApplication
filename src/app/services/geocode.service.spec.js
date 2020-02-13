"use strict";
var testing_1 = require("@angular/core/testing");
var geocode_service_1 = require("./geocode.service");
describe('GeocodeService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [geocode_service_1.GeocodeService]
        });
    });
    it('should be created', testing_1.inject([geocode_service_1.GeocodeService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=geocode.service.spec.js.map