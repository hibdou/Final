import { Component, OnInit } from '@angular/core';
import { CensusService, Census } from '../census.service';

@Component({
  selector: 'app-census',
  templateUrl: './census.component.html',
  styleUrls: ['./census.component.css']
})
export class CensusComponent implements OnInit {
  censusList: Census[] = [];

  constructor(private censusService: CensusService) {}

  ngOnInit(): void {
    this.loadCensusRecords();
  }

  loadCensusRecords(): void {
    this.censusService.getCensusRecords().subscribe((data) => {
      this.censusList = data;
    });
  }

  addCensusRecord(): void {
    const newCensus: Census = {
      year: 2020,
      censusTaker: 'John Doe',
      peopleInHousehold: 4,
      address: {
        street: '123 Elm St',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
      },
    };
    this.censusService.addCensusRecord(newCensus).subscribe(() => {
      this.loadCensusRecords();
    });
  }

  deleteCensusRecord(id: string): void {
    this.censusService.deleteCensusRecord(id).subscribe(() => {
      this.loadCensusRecords();
    });
  }

  updateCensusRecord(id: string): void {
    const updatedCensus: Census = {
      year: 2020,
      censusTaker: 'Jane Doe',
      peopleInHousehold: 5,
      address: {
        street: '456 Oak St',
        city: 'Lincoln',
        state: 'NE',
        zipCode: '68508',
      },
    };
    this.censusService.updateCensusRecord(id, updatedCensus).subscribe(() => {
      this.loadCensusRecords();
    });
  }
}
