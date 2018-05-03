import {
  Injectable
} from '@angular/core';
import {
  GeocodingApiKey
} from '../consts'
import {
  createClient
} from '@google/maps'
import {
  fromPromise
} from 'rxjs/observable/fromPromise';


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

  addressesToLatLong(addresses: Array < string > ): Promise < Array < google.maps.LatLng >> {

    let distinctAddresses = addresses.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });

    let LatLongOfAllLocations = []

    distinctAddresses.forEach(currentAddress => {
      LatLongOfAllLocations.push(this.addressToLatLong(currentAddress))
    });

    return Promise.all(LatLongOfAllLocations).then((values) => {
      return values.map(val => val.json.results[0].geometry.location)
    });
  }

}
