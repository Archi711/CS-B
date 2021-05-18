using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace CSB
{
    public partial class Form1 : Form
    {

        //Główny konstruktor formularza
        public Form1()
        {
            InitializeComponent();
           
        }
        
        
        //Zdefiniowanie zmiennej  "Kontekstu danych" - "mapowanie" (uzyskanie informacji min. o strukturze np. tabel, procedur oraz definiowanie parametrów połączeniowych) do bazy dnaych
        DataClasses1DataContext repozytorium = new DataClasses1DataContext();

        //Funkcja definiująca zdarzenie ładowania na ekran głównego formularza
        private void Form1_Load(object sender, EventArgs e)
        {
            //Wywołanie funkcji pobierającej dane z bazy i wyświetlające je w obiekcie DataGridView 
            OdswiezGridaDanymi();
            ink_Id.Text = Entry_p.SetValueFor_ink_id_txt; //zmienna do przekazywania ID inkasenta
            dateTime.Text = DateTime.Now.ToShortDateString(); //30.5.2012; 
            dvgReadList.Columns[0].Width = 30;
            dvgReadList.Columns[3].Width = 120;
            dvgReadList.Columns[4].Width = 30;
            dvgReadList.Columns[5].Width = 30;
            dvgReadList.Columns[6].Width = 100;
            dvgReadList.Columns[7].Width = 70;
            dvgReadList.Columns[8].Width = 70;



        }

        //Definicja funkcji  pobierającej dane z bazy i wyświetlające je w obiekcie DataGridView
        private void OdswiezGridaDanymi()
        {

            try
            {
                //zdefiniowanie zmiennej przechowującej dane wynikowe
                var zbiorWynikowy =
                //definicja zapytania zwracająca wszystkie wiersze w tabeli Osoba w formacie LINQ
                from wiersz in repozytorium.GetTable<ReadingList_VW>()
                select wiersz;
                
                //ustawienie otrzymanych danych wynikowych jako źródła danych dla obiektu DataGridView(w tym przypadku o nazwie dgvOsoba)
                dvgReadList.DataSource = zbiorWynikowy;
            }
            catch (Exception ex)
            {
                //Wyświetlenie informacji o ewentualnym wyjątku
                MessageBox.Show(ex.ToString());
            }
        }

 


        
        private void label8_Click(object sender, EventArgs e)
        {

        }

        private void dgvOsoba_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void dgvOsoba_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            odczyt f2 = new odczyt();
            f2.txtID.Text = this.dvgReadList.CurrentRow.Cells[0].Value.ToString();
            f2.txtImie.Text = this.dvgReadList.CurrentRow.Cells[1].Value.ToString();
            f2.txtNazwisko.Text = this.dvgReadList.CurrentRow.Cells[2].Value.ToString();
            f2.txtUlica.Text = this.dvgReadList.CurrentRow.Cells[3].Value.ToString();
            f2.txtUnr.Text = this.dvgReadList.CurrentRow.Cells[4].Value.ToString();
            f2.txtMnr.Text = this.dvgReadList.CurrentRow.Cells[5].Value.ToString();
            f2.txtTel.Text = this.dvgReadList.CurrentRow.Cells[6].Value.ToString();
            f2.txtCiepla.Text = 0.ToString();
            f2.txtZimna.Text = 0.ToString();
            f2.txtDate.Text = this.dateTime.Text;
            this.Hide();
            f2.ShowDialog();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
            Form1 frm1 = new Form1();
            frm1.Show();


        }
    }
}
