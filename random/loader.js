// implement loader with next functionality:
// 1 load image by url
// 2 have request timeout
// 3 retry count should be configurable
// 4 max count of concurrent requests should be configurable

const delay = time => new Promise(res => setTimeout(res, time));

class Loader{
    constructor(fetch){
        this.fetch = fetch;
    }

    load(url, options = {}){
        const { timeout = 10000, retries = 2 } = options;
        const { fetch } = this;
        let retriesCount = 0;

        function _load (){
            return new Promise((res, rej) => {
                    fetch(url).then(res).catch(rej);
                    delay(timeout).then(() => rej('timeout error'));
                })
                .catch(e => {
                    if(retriesCount < retries){
                        retriesCount++;
                        return _load();
                    }
                    return Promise.reject(e);
                });
        };

        return _load();
    }
}

const loader = new Loader(
    () => new Promise(res => setTimeout(() => res(42), 1000))
)

loader.load();
// imageManager.getUrl(
//     url, // URL изображения
//     {
//         timeout: 1000, // таймаут загрузки
//         retries: 3 // количество ретраев
//     }
// ) → Promise
// // Менеджер параметризуется максимальным числом одновременно исполняемых запросов.
