public class InMemoryCacheTest {
 
    public static void main(String[] args) throws InterruptedException {

        InMemoryCacheTest Cache = new InMemoryCacheTest();
 
        System.out.println("\n\n==========Test1: TestAddRemoveObjects ==========");
        Cache.TestAddRemoveObjects();
        System.out.println("\n\n==========Test2: TestExpiredCacheObjects ==========");
        Cache.TestExpiredCacheObjects();
        System.out.println("\n\n==========Test3: TestObjectsCleanupTime ==========");
        Cache.TestObjectsCleanupTime();
    }
 
    private void TestAddRemoveObjects() {

        InMemoryCache<String, String> cache = new InMemoryCache<String, String>(200, 500, 6);
 
        cache.put("SJSU", "California");
        cache.put("NCSU", "Carolina");
        cache.put("MIT", "Massachusets");
        cache.put("TAMU", "Texas");
        cache.put("UTA", "Texas");
        cache.put("UMN", "Minnesota");
 
        System.out.println("6 Cache Object Added.. cache.size(): " + cache.size());
        cache.remove("MIT");
        System.out.println("One object removed.. cache.size(): " + cache.size());
 
        cache.put("Stanford", "California");
        cache.put("UTA", "Texas");
        System.out.println("Two objects Added but reached maxItems.. cache.size(): " + cache.size());
 
    }
 
    private void TestExpiredCacheObjects() throws InterruptedException {
 

        InMemoryCache<String, String> cache = new InMemoryCache<String, String>(1, 1, 10);
 
        cache.put("sjsu", "California");
        cache.put("ucla", "California");
        Thread.sleep(3000);
 
        System.out.println("Two objects are added but reached timeToLive. cache.size(): " + cache.size());
 
    }
 
    private void TestObjectsCleanupTime() throws InterruptedException {
        int size = 500000;
 

        InMemoryCache<String, String> cache = new InMemoryCache<String, String>(100, 100, 500000);
 
        for (int i = 0; i < size; i++) {
            String value = Integer.toString(i);
            cache.put(value, value);
        }
 
        Thread.sleep(200);
 
        long start = System.currentTimeMillis();
        cache.cleanup();
        double finish = (double) (System.currentTimeMillis() - start) / 1000.0;
 
        System.out.println("Cleanup times for " + size + " objects are " + finish + " s");
 
    }
}
