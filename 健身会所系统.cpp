#include<iostream>
#include<string>
#include<stdlib.h>
#include<fstream>
using namespace std;
class Building                  //�����ۺϻ��������ࣩ
{
public:
    int projectId;
    double pricePerYear;        //ÿ��۸�
    string openTime ;           //����ʱ��
    Building(int id,double pricePY,string opTime)
    {
       projectId=id;
       pricePerYear=pricePY;
       openTime=opTime;
    }

};
class SwimPool :public Building //��Ӿ�� (����)
{
public:
    SwimPool(int id,double pricePY,string opTime,string waterTem,string oToAge):Building(id,pricePY,opTime)
    {
        waterTemperater=waterTem;
        openToAge=oToAge;
    }
    void showInfo(){
        cout<<"��Ӿ��:"<<endl;
        cout<<"��ĿIdΪ:"<<projectId<<endl;
        cout<<"����۸�:"<<pricePerYear<<endl;
        cout<<"����ʱ��:"<<openTime<<endl;
        cout<<"Ӿ��ˮ��:"<<waterTemperater<<endl;
        cout<<"�ʺ�����:"<<openToAge<<endl;
        cout<<endl;
    }

    string waterTemperater;  //ˮ��
    string openToAge;        //��������
};
class FitRoom :public Building //���� (����)
{
public:
    FitRoom(int id,double pricePY,string opTime,int cNumber,string sbpp):Building(id,pricePY,opTime)
    {
        couchNumber = cNumber  ; //���������Ŀ
        shebeipinpai = sbpp   ;  //�����豸Ʒ��
    }
    void showInfo(){
        cout<<"����:"<<endl;
        cout<<"��ĿIdΪ:"<<projectId<<endl;
        cout<<"����۸�:"<<pricePerYear<<endl;
        cout<<"����ʱ��:"<<openTime<<endl;
        cout<<"��������:"<<couchNumber<<endl;
        cout<<"�豸Ʒ��:"<<shebeipinpai<<endl;
        cout<<endl;
    }

    int couchNumber;
    string shebeipinpai;
};
class YuJiaRoom :public Building //�٤��
{
public:
    YuJiaRoom(int id,double pricePY,string opTime,string tcName,string kcap):Building(id,pricePY,opTime)
    {
        teacherName = tcName;     //��ʦ����
        keChengAnPai = kcap ;     //�γ̰���
    }
    void showInfo(){
        cout<<"�٤��:"<<endl;
        cout<<"��ĿIdΪ:"<<projectId<<endl;
        cout<<"����۸�:"<<pricePerYear<<endl;
        cout<<"����ʱ��:"<<openTime<<endl;
        cout<<"��ʦ����:"<<teacherName<<endl;
        cout<<"�γ̰���:"<<keChengAnPai<<endl;
        cout<<endl;
    }

    string teacherName;
    string keChengAnPai;
};
class CstmInfor         //�˿���Ϣ
{
public:
    void dis()
    {
        cout<<"�û�����:"<<CstmName<<endl;
        cout<<"ѡ��ķ�����Ŀ:"<<id<<endl;
        cout<<"��������:"<<beginTime<<endl;
    }
    CstmInfor()
    {
    }
    void setinfo()
    {
        int flag =0;
        cout<<"������������"<<endl;
        cin>>CstmName;
        while(true){
            if(flag ==0){
                    flag = 1;
                cout<<"������ѡ��ķ�����Ŀ(��������Ŀid)"<<endl;
            }
            else{
                cout<<"��Ǹ����������,����������:"<<endl;
                cout<<"������ѡ��ķ�����Ŀ(��������Ŀid)"<<endl;
            }
            cin>>id;
            if(id==1||id==2||id==3){
                switch(id){
                    case 1: fwxm = "��Ӿ��";
                    break;
                    case 2:fwxm="����";
                    break;
                    case 3:fwxm ="�٤��";
                    break;
                }
                flag=0;
                break;
            }
        }
        cout<<"�����뿪��ʱ��"<<endl;
        cin>>beginTime;
    }
    string CstmName;               //�û�����
    int id;           //�û�ѡ��Ľ�����Ŀ
    string fwxm;       //�û�ѡ��ķ�����Ŀ
    string beginTime;          //�û�����ʱ��
};

void loginInterface(){
    cout<<"�˿����";
}
void AllInfo(){
    SwimPool sp=SwimPool(1,680,"�ļ�5-10��","26���϶�","8-55��");
    FitRoom fr=FitRoom(2,1680,"ȫ�꿪��",23,"Ӣ����");
    YuJiaRoom yjr=YuJiaRoom(3,2680,"ȫ�꿪��","��ΰ��","����3:00-5:00 & ����7:00-9:00");
    sp.showInfo();
    fr.showInfo();
    yjr.showInfo();
}
int huanying(){
    cout<<"��ӭ�������������"<<endl;
    cout<<"���������ǻ����ķ�����Ϣ:"<<endl<<endl;
    AllInfo();
    int a;
    while(true){
        cout<<"�����Ҫ�쿨,������1,������˳���ϵͳ,������0:";
        cin>>a;
        if(a==0||a==1){
            break;
        }
    }
    return a;
}
int confirm(CstmInfor ci){
    cout<<"��ȷ�����������Ϣ"<<endl;
    cout<<"����:"<<ci.CstmName<<endl;
    cout<<"������Ŀ:"<<ci.fwxm<<endl;
    cout<<"����ʱ��:"<<ci.beginTime<<endl;
    cout<<"ȷ����������1��������д����0:";
    int conf = 0;
    while(true){
        cin>>conf;
        if(conf==1||conf==0){
            break;
        }
        else{
            cout<<"������0��1��ȷ����Ϣ!!!"<<endl;
        }
    }
    return conf;
}
void writeInFile(CstmInfor ci){//������д���ļ�
    fstream both ;
    both.open("�����������.txt",ios::app);
    both<<"����:"<<" "<<ci.CstmName<<" ";
    both<<"��Ŀ:"<<" "<<ci.fwxm<<" ";
    both<<"��ʼʱ��:"<<" "<<ci.beginTime<<endl;
    both.close();
}
void readFile(){    //J�����ݴ��ļ�����
    fstream both ;
    both.open("�����������.txt");
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
    const string userPassword="123456";    //�ж��Ƿ��ǹ���Ա������Ա���Բ鿴��Ϣ
    string key;
    //�ж��ǹ���Ա���ǹ˿�
    while(true){
        cout<<"����Ա��½���������룬�ο͵�½������'youke'::";
        cin>>key;
        if(key==userPassword||key=="youke"){
            break;
        }
    }
    //�ο���ݵ�½
    if(key == "youke"){
        //չʾ��ӭ����
        int res = huanying();
        int conf ;
        if(res==1){
            //��˿�չʾ��Ϣ
            system("cls");
            AllInfo();
            //�û���д��Ϣ
            CstmInfor ci =  CstmInfor();
            ci.setinfo();
            system("cls");
            //�û�ȷ����Ϣ
            conf = confirm(ci);
            while(true){
                if(conf==1){
                    system("cls");
                    writeInFile(ci);
                    cout<<"���ύ��������¼�����ݿ�,ϣ�����ǵķ�������������Ҫ��ף���˶���죡��"<<endl;
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
    //����Ա��ݵ�½
    else{
        cout<<"�������˹���Աϵͳ";
        cout<<"���潫Ϊ��չʾ��Ա��Ϣ:"<<endl;
        readFile();
    }
}
