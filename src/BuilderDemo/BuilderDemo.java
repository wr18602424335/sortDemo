package BuilderDemo;

public class BuilderDemo {

    int i;
    int j;
    static int ii;
    public BuilderDemo(Bulider bulider){
        i=bulider.i;
        j=bulider.j;
    }

    public static class Bulider{
        int i;
        int j;
        static int i1i;
       public  Bulider  addi(int ii){
           this.i=ii;
           return this;
        }
       public Bulider  addj(int jj){
            this.i=jj;
            return this;
        }
        BuilderDemo build(){
                    BuilderDemo builderDemo=new BuilderDemo(this);
           return builderDemo;
        }
    }

    public static void main(String[] args) {
        Bulider b= new BuilderDemo.Bulider();
        System.out.println(b.addi(1));
        System.out.println(b.i);
    }
}
