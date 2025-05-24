import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QueryResult } from '../../services/query.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-query-results',
  imports: [CommonModule, MatTableModule],
  templateUrl: './query-results.component.html',
  styleUrl: './query-results.component.scss'
})
export class QueryResultsComponent implements OnChanges {
  @Input() queryResult?: QueryResult;
  
  displayedColumns: string[] = [];
  dataSource: any[] = [];
  executionInfo: string = '';
  hasError: boolean = false;
  errorMessage: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['queryResult'] && this.queryResult) {
      this.displayedColumns = this.queryResult.columns;
      this.dataSource = this.queryResult.rows.map(row => {
        const rowObj: any = {};
        row.forEach((cell, index) => {
          rowObj[this.queryResult!.columns[index]] = cell;
        });
        return rowObj;
      });
      
      this.executionInfo = `${this.queryResult.rowCount} rows returned in ${this.queryResult.executionTime.toFixed(3)} seconds`;
      
      this.hasError = !!this.queryResult.error;
      this.errorMessage = this.queryResult.error || '';
    }
  }
}
