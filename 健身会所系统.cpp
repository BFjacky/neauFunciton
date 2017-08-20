#include<iostream>
#include<string>
#include<stdlib.h>
#include<fstream>
using namespace std;
class Building                  //健身综合会所（父类）
{
public:
    int projectId;
    double pricePerYear;        //每年价格
    string openTime ;           //开放时间
    Building(int id,double pricePY,string opTime)
    {
       projectId=id;
       pricePerYear=pricePY;
       openTime=opTime;
    }

};
class SwimPool :public Building //游泳馆 (子类)
{
public:
    SwimPool(int id,double pricePY,string opTime,string waterTem,string oToAge):Building(id,pricePY,opTime)
    {
        waterTemperater=waterTem;
        openToAge=oToAge;
    }
    void showInfo(){
        cout<<"游泳馆:"<<endl;
        cout<<"项目Id为:"<<projectId<<endl;
        cout<<"包年价格:"<<pricePerYear<<endl;
        cout<<"开放时间:"<<openTime<<endl;
        cout<<"泳池水温:"<<waterTemperater<<endl;
        cout<<"适合年龄:"<<openToAge<<endl;
        cout<<endl;
    }

    string waterTemperater;  //水温
    string openToAge;        //开放年龄
};
class FitRoom :public Building //健身房 (子类)
{
public:
    FitRoom(int id,double pricePY,string opTime,int cNumber,string sbpp):Building(id,pricePY,opTime)
    {
        couchNumber = cNumber  ; //健身教练数目
        shebeipinpai = sbpp   ;  //健身设备品牌
    }
    void showInfo(){
        cout<<"健身房:"<<endl;
        cout<<"项目Id为:"<<projectId<<endl;
        cout<<"包年价格:"<<pricePerYear<<endl;
        cout<<"开放时间:"<<openTime<<endl;
        cout<<"教练数量:"<<couchNumber<<endl;
        cout<<"设备品牌:"<<shebeipinpai<<endl;
        cout<<endl;
    }

    int couchNumber;
    string shebeipinpai;
};
class YuJiaRoom :public Building //瑜伽馆
{
public:
    YuJiaRoom(int id,double pricePY,string opTime,string tcName,string kcap):Building(id,pricePY,opTime)
    {
        teacherName = tcName;     //老师姓名
        keChengAnPai = kcap ;     //课程安排
    }
    void showInfo(){
        cout<<"瑜伽馆:"<<endl;
        cout<<"项目Id为:"<<projectId<<endl;
        cout<<"包年价格:"<<pricePerYear<<endl;
        cout<<"开放时间:"<<openTime<<endl;
        cout<<"老师姓名:"<<teacherName<<endl;
        cout<<"课程安排:"<<keChengAnPai<<endl;
        cout<<endl;
    }

    string teacherName;
    string keChengAnPai;
};
class CstmInfor         //顾客信息
{
public:
    void dis()
    {
        cout<<"用户姓名:"<<CstmName<<endl;
        cout<<"选择的服务项目:"<<id<<endl;
        cout<<"开卡日期:"<<beginTime<<endl;
    }
    CstmInfor()
    {
    }
    void setinfo()
    {
        int flag =0;
        cout<<"请输入姓名："<<endl;
        cin>>CstmName;
        while(true){
            if(flag ==0){
                    flag = 1;
                cout<<"请输入选择的服务项目(请输入项目id)"<<endl;
            }
            else{
                cout<<"抱歉您输入有误,请重新输入:"<<endl;
                cout<<"请输入选择的服务项目(请输入项目id)"<<endl;
            }
            cin>>id;
            if(id==1||id==2||id==3){
                switch(id){
                    case 1: fwxm = "游泳馆";
                    break;
                    case 2:fwxm="健身房";
                    break;
                    case 3:fwxm ="瑜伽馆";
                    break;
                }
                flag=0;
                break;
            }
        }
        cout<<"请输入开卡时间"<<endl;
        cin>>beginTime;
    }
    string CstmName;               //用户姓名
    int id;           //用户选择的健身项目
    string fwxm;       //用户选择的服务项目
    string beginTime;          //用户开卡时间
};

void loginInterface(){
    cout<<"顾客你好";
}
void AllInfo(){
    SwimPool sp=SwimPool(1,680,"夏季5-10月","26摄氏度","8-55岁");
    FitRoom fr=FitRoom(2,1680,"全年开放",23,"英尔健");
    YuJiaRoom yjr=YuJiaRoom(3,2680,"全年开放","张伟丽","下午3:00-5:00 & 晚上7:00-9:00");
    sp.showInfo();
    fr.showInfo();
    yjr.showInfo();
}
int huanying(){
    cout<<"欢迎来到健身会所！"<<endl;
    cout<<"以下是我们会所的服务信息:"<<endl<<endl;
    AllInfo();
    int a;
    while(true){
        cout<<"如果想要办卡,请输入1,如果想退出本系统,请输入0:";
        cin>>a;
        if(a==0||a==1){
            break;
        }
    }
    return a;
}
int confirm(CstmInfor ci){
    cout<<"请确认您所填的信息"<<endl;
    cout<<"姓名:"<<ci.CstmName<<endl;
    cout<<"服务项目:"<<ci.fwxm<<endl;
    cout<<"开卡时间:"<<ci.beginTime<<endl;
    cout<<"确认无误输入1，重新填写输入0:";
    int conf = 0;
    while(true){
        cin>>conf;
        if(conf==1||conf==0){
            break;
        }
        else{
            cout<<"请输入0或1来确认信息!!!"<<endl;
        }
    }
    return conf;
}
void writeInFile(CstmInfor ci){//将内容写入文件
    fstream both ;
    both.open("健身会所数据.txt",ios::app);
    both<<"姓名:"<<" "<<ci.CstmName<<" ";
    both<<"项目:"<<" "<<ci.fwxm<<" ";
    both<<"开始时间:"<<" "<<ci.beginTime<<endl;
    both.close();
}
void readFile(){    //J将内容从文件读出
    fstream both ;
    both.open("健身会所数据.txt");
    int length;
    both.seekg(0, std::ios::end);
    length = both.tellg();
    both.seekg(0, std::ios::beg);
    char * buffer = new char[length];
    both.read(buffer, length);
    both.close();
    cout<<buffer;
}
int main(){
    const string userPassword="123456";    //判断是否是管理员，管理员可以查看信息
    string key;
    //判断是管理员还是顾客
    while(true){
        cout<<"管理员登陆请输入密码，游客登陆请输入'youke'::";
        cin>>key;
        if(key==userPassword||key=="youke"){
            break;
        }
    }
    //游客身份登陆
    if(key == "youke"){
        //展示欢迎界面
        int res = huanying();
        int conf ;
        if(res==1){
            //向顾客展示信息
            system("cls");
            AllInfo();
            //用户填写信息
            CstmInfor ci =  CstmInfor();
            ci.setinfo();
            system("cls");
            //用户确认信息
            conf = confirm(ci);
            while(true){
                if(conf==1){
                    system("cls");
                    writeInFile(ci);
                    cout<<"您提交的数据已录入数据库,希望我们的服务能满足您的要求，祝您运动愉快！！"<<endl;
                    break;
                }
                else{
                    system("cls");
                    ci.setinfo();
                    system("cls");
                    conf = confirm(ci);
                }
            }
        }
    }
    //管理员身份登陆
    else{
        cout<<"您进入了管理员系统";
        cout<<"下面将为您展示会员信息:"<<endl;
        readFile();
    }
}
