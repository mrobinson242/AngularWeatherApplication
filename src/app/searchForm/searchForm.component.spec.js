"use strict";
var searchForm_component_1 = require("./searchForm.component");
var testing_1 = require("@angular/core/testing");
describe('SearchFormComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [searchForm_component_1.SearchFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(searchForm_component_1.SearchFormComponent);
        component = fixture.componentInstance;
    });
    it('should create component', function () { return expect(component).toBeTruthy(); });
});
//# sourceMappingURL=searchForm.component.spec.js.map