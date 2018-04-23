import {
  Injectable
} from '@angular/core';
import {
  GeocodingApiKey
} from '../consts'
import {
  createClient
} from '@google/maps'
import { fromPromise } from 'rxjs/observable/fromPromise';


@Injectable()
export class GeolocationService {

  mapsClient = undefined

  constructor() {
    this.mapsClient = createClient({
      key: GeocodingApiKey,
      Promise: Promise
    })
  }


  addressToLatLong(address: string) {
    return this.mapsClient.geocode({
      address: address
    }).asPromise()
  }

  addressesToLatLong(addresses: Array < string > ) {
    debugger;
    let LatLongOfAllLocations = []

    addresses.forEach(currentAddress => {
      LatLongOfAllLocations.push(this.addressToLatLong(currentAddress))
    });

    Promise.all(LatLongOfAllLocations).then((values) => console.log(values.json.results));
  }

}
