/**
 * Created by Windows10 on 2017/8/18.
 */
import router from "../router";
export const go = ([name, id, query] = []) => new Promise((resolve, reject) => resolve(!name ? router.back() : router.push({
  name,
  params: typeof id == 'object' ? id : {id},
  query
})));
