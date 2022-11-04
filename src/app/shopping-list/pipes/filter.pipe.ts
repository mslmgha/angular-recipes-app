import { Pipe, PipeTransform } from "@angular/core";
import { Ingredient } from "src/app/Shared/ingredient.model";

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(value: Ingredient[], filterValue: string, property: string) {
        if (value.length === 0 || !filterValue) {
            return value;
        }
        const filteredArray:Ingredient[] = [];
        for (let item of value) {
            if (item[property].toUpperCase().includes(filterValue.toUpperCase())) {
                filteredArray.push(item);
            }
        }
        return filteredArray;
    }
}