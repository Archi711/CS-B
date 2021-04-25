using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace CS_B
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            this.StartPosition = FormStartPosition.Manual;
            this.Location = new Point(500, 20);
        }

        private void Form1_Load(object sender, EventArgs e)
        {

            //Uruchomienie funkcji odświeżającej ekranową tabelę z danymi
            wypelnijTabeleDanymi();
            ink_id.Text = Entry_p.SetValueFor_ink_id_txt; //zmienna do przekazywania ID inkasenta
            
        }

        
        //Definicja głównego stringu połączeniowego
        string sConnectionString = "Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=NETSTUDENT;Data Source=.\\SQLEXPRESS";
        //Zmienna realizująca proces połączenia
        private SqlConnection polaczenie;
        //funkcja służąca do nawiązywania połączenia
        public bool polacz()
        {
            try
            {
                //inicjalizacja połączenia wartością stringu połączeniowego
                polaczenie = new SqlConnection(sConnectionString);

                //otwarcie połączenia z bazą danych
                polaczenie.Open();
                return true;

            }
            catch
            {
                //w przypadku niepowodzenia zwrócenie kodu błędu
                MessageBox.Show("Błąd 02");
                return false;
            }
        }

        //funkcja służąca do rozłączenia połączenia
        public bool rozlacz()
        {
            try
            {
                //zamknięcie połączenia
                polaczenie.Close();
                return true;
            }
            catch
            {
                //w przypadku niepowodzenia zwrócenie wartości false
                return false;
            }
        }

        // wykonanie sql'owego polecenia select i wpisanie danych do DataSet
        public DataSet select(string query)
        {
            //Wykonanie zapytania sql
            SqlCommand xquery = new SqlCommand(query, polaczenie);
            //Zapisanie otrzymanych danych w obiekcie SqlDataAdapter
            SqlDataAdapter xdata = new SqlDataAdapter(xquery);
            //Utworzenie obiektu DataSet
            DataSet res = new DataSet();

            try
            {
                //Wpełnienie obiektu DataSet danymi
                xdata.Fill(res);
            }
            catch
            {
                return null;
            }
            return res;
        }

        //Realizacja procesu pobrania danych z bazy
        private void wypelnijTabeleDanymi()
        {

            polacz();
            dtsTabelaTestowa = select("select * from tblStudent1");
            dgStudent.DataSource = dtsTabelaTestowa.Tables[0];
            dgStudent.Refresh();
            rozlacz();
        }

        //Zmienna przechowująca IDstudenta (z tabeli tblStudent)
        string IDStudenta;

        //Funkcja wyświetlająca w kontrolkach textBox dane wybranej osoby (oraz wpisująca wartość do IDStudenta)
        private void dgStudent_SelectionChanged(object sender, EventArgs e)
        {

            if (dgStudent.SelectedRows.Count > 0)
            {
                IDStudenta = dgStudent.SelectedRows[0].Cells[0].Value.ToString();
                txtImie.Text = dgStudent.SelectedRows[0].Cells[1].Value.ToString();
                txtNazwisko.Text = dgStudent.SelectedRows[0].Cells[2].Value.ToString();
                txtDaneKontaktowe.Text = dgStudent.SelectedRows[0].Cells[3].Value.ToString();
            }
        }


        //Oprogramowanie zdarzenia naciśnięcia przycisku Modyfikuj
        private void btnModyfikuj_Click(object sender, EventArgs e)
        {
            //Utworzenie obiektu SqlConnection
            SqlConnection objConn = new SqlConnection(sConnectionString);
            //Otrwarcie połączenia z bazą danych
            objConn.Open();

            // Utworzenie wystąpienia obiektu DataAdapter.
            SqlDataAdapter daStudenci = new SqlDataAdapter("select * from tblStudent1", objConn);

            // Utworzenie wystąpienia obiektu DataSet 
            DataSet dsStudenci = new DataSet("Studenci");
            //Wypełnienie obiektu DataSet  schematem danych
            daStudenci.FillSchema(dsStudenci, SchemaType.Source, "tblStudent1");
            //Wypełnienie obiektu DataSet  danymi z tabeli
            daStudenci.Fill(dsStudenci, "tblStudent1");
            //****************
            // ROZPOCZĘCIE KODU DODAWANIA 
            // Utworzenie nowego wystąpienia obiektu DataTable.
            DataTable tblStudenci;
            tblStudenci = dsStudenci.Tables["tblStudent1"];

            //Utworzenie obiektu DataRow
            DataRow drCurrent;

            // ROZPOCZĘCIE KODU EDYCJI 

            //Ustawienie wiersza do edycji na właściwy wiersz (wybrany z tblStudenci na podstawie wartości z IDStudenta)
            drCurrent = tblStudenci.Rows.Find(IDStudenta);
            //Rozpoczęcie edycji wiersza
            drCurrent.BeginEdit();
            //Wstawienie  wartości pod wybrane kolumny edytowanego wiersza
            drCurrent["Imie"] = txtImie.Text;
            drCurrent["Nazwisko"] = txtNazwisko.Text;
            drCurrent["Dane_Kontaktowe"] = txtDaneKontaktowe.Text;
            //Zakończenie edycji wiersza
            drCurrent.EndEdit();

            // ZAKOŃCZENIE KODU EDYCJI   
            //*****************
            // ROZPOCZĘCIE PRZESYŁANIA ZMIAN DO SERWERA SQL 
            //Utworzenie obiektu SqlCommandBuilder
            SqlCommandBuilder objCommandBuilder = new SqlCommandBuilder(daStudenci);

            // Ustawienie parametru gwarantującego kontynuację zapisu pomimo błędu
            daStudenci.ContinueUpdateOnError = true;

            //Przesłanie zmian do serwera SQL
            daStudenci.Update(dsStudenci, "tblStudent1");


            // ZAKOŃCZENIE PRZESYŁANIA ZMIAN DO SERWERA SQL 


            // Zapisanie wartości obiektu DataSet do pliku XML
            dsStudenci.WriteXml("test.xml", XmlWriteMode.WriteSchema);


            wypelnijTabeleDanymi();
            objConn.Close();
        }

        //Przykładowy kod służący do usuwania wartości z DataSet
        // ROZPOCZĘCIE KODU USUWANIA 

        //drCurrent = tblAuthors.Rows.Find("17");
        //drCurrent.Delete();

        // ZAKOŃCZENIE KODU USUWANIA  
        //*****************

        private void btnDodaj_Click(object sender, EventArgs e)
        {
            //Utworzenie obiektu SqlConnection
            SqlConnection objConn = new SqlConnection(sConnectionString);
            //Otrwarcie połączenia z bazą danych
            objConn.Open();

            // Utworzenie wystąpienia obiektu DataAdapter. 
            SqlDataAdapter daStudenci = new SqlDataAdapter("select * from tblStudent1", objConn);

            // Utworzenie wystąpienia obiektu DataSet 
            DataSet dsStudenci = new DataSet("Studenci");
            //Wypełnienie obiektu DataSet  schematem danych
            daStudenci.FillSchema(dsStudenci, SchemaType.Source, "tblStudent1");
            //Wypełnienie obiektu DataSet  danymi z tabeli
            daStudenci.Fill(dsStudenci, "tblStudent1");
            //****************
            // ROZPOCZĘCIE KODU DODAWANIA 
            // Utworzenie nowego wystąpienia obiektu DataTable.
            DataTable tblStudenci;
            tblStudenci = dsStudenci.Tables["tblStudent1"];

            DataRow drStudenci;
            // Uzyskanie nowego obiektu DataRow z obiektu DataTable.
            drStudenci = tblStudenci.NewRow();

            // Ustawienie potrzebnych wartości pól obiektu DataRow.
            drStudenci["Imie"] = txtImieDodawanie.Text;
            drStudenci["Nazwisko"] = txtNazwiskoDodawanie.Text;
            drStudenci["Dane_Kontaktowe"] = txtDaneKontaktoweDodawanie.Text;


            // Przekazanie tego nowego obiektu do metody Add obiektu DataTable.
            tblStudenci.Rows.Add(drStudenci);


            // ZAKOŃCZENIE KODU DODAWANIA   

            // ROZPOCZĘCIE PRZESYŁANIA ZMIAN DO SERWERA SQL 

            SqlCommandBuilder objCommandBuilder = new SqlCommandBuilder(daStudenci);

            // Ustawienie parametru gwarantującego kontynuację zapisu pomimo błędu
            daStudenci.ContinueUpdateOnError = true;

            //Przesłanie zmian do serwera SQL
            daStudenci.Update(dsStudenci, "tblStudent1");


            // ZAKOŃCZENIE PRZESYŁANIA ZMIAN DO SERWERA SQL 


            // Zapisanie wartości obiektu DataSet do pliku XML
            dsStudenci.WriteXml("test.xml", XmlWriteMode.WriteSchema);


            //Odświeżenie zawartości głównego DataGrid w aplikacji
            wypelnijTabeleDanymi();

            objConn.Close();
        }

        private void txtNazwisko_TextChanged(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void txtDaneKontaktowe_TextChanged(object sender, EventArgs e)
        {

        }

        private void ink_info_Click(object sender, EventArgs e)
        {

        }
    }
}
